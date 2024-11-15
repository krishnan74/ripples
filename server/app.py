from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit
from io import BytesIO
import base64
import cirq
import pandas as pd
import numpy as np
import networkx as nx

app = Flask(__name__)
CORS(app, resources={r"/generate-circuit": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/generate-qaoa-circuit": {"origins": "http://localhost:3000"}})


@app.route("/generate-qaoa-circuit", methods=["POST"])
def generate_qaoa_circuit():

    print("API called")
    data = pd.read_csv('ripples.csv', encoding='latin-1')


    def find_nearby_cities(from_city, to_city, data, num_cities=12):
        from_coords = data[data['city'] == from_city][['lng', 'lat']].values[0]
        to_coords = data[data['city'] == to_city][['lng', 'lat']].values[0]


        data['distance_from_from_city'] = np.sqrt((data['lng'] - from_coords[0])**2 + (data['lat'] - from_coords[1])**2)
        data['distance_from_to_city'] = np.sqrt((data['lng'] - to_coords[0])**2 + (data['lat'] - to_coords[1])**2)


        nearby_from = data.nsmallest(num_cities, 'distance_from_from_city')
        nearby_to = data.nsmallest(num_cities, 'distance_from_to_city')


        nearby_cities = pd.concat([nearby_from, nearby_to]).drop_duplicates()


        if from_city not in nearby_cities['city'].values:
            nearby_cities = pd.concat([nearby_cities, data[data['city'] == from_city]])


        if to_city not in nearby_cities['city'].values:
            nearby_cities = pd.concat([nearby_cities, data[data['city'] == to_city]])


        return nearby_cities.head(num_cities)


    from_city = request.json.get('from_city')
    to_city = request.json.get('to_city')

    nearby_cities_df = find_nearby_cities(from_city, to_city, data)


    G = nx.Graph()


    for index, row in nearby_cities_df.iterrows():
        G.add_node(row['city'], pos=(row['lng'], row['lat']), weight=1) 


    threshold = 5.0  
    for i in range(len(nearby_cities_df)):
        for j in range(i + 1, len(nearby_cities_df)):
            dist = np.sqrt((nearby_cities_df.iloc[i]['lng'] - nearby_cities_df.iloc[j]['lng'])**2 +
                        (nearby_cities_df.iloc[i]['lat'] - nearby_cities_df.iloc[j]['lat'])**2)
            if dist < threshold:
                G.add_edge(nearby_cities_df.iloc[i]['city'], nearby_cities_df.iloc[j]['city'], weight=1)  

    if G.has_node(from_city) and G.has_node(to_city):
        G.add_edge(from_city, to_city)


    qubit_map = {node: cirq.LineQubit(i) for i, node in enumerate(G.nodes())}


    def create_qaoa_circuit(graph, p, gamma):
        qubits = [qubit_map[node] for node in graph.nodes()]
        circuit = cirq.Circuit()


        circuit.append(cirq.H.on_each(qubits))


        for layer in range(p):
            for u, v in graph.edges():
                circuit.append(cirq.Z(qubits[list(graph.nodes()).index(u)]) * cirq.Z(qubits[list(graph.nodes()).index(v)]))


            for q in qubits:
                circuit.append(cirq.rx(2 * gamma).on(q))


        circuit.append(cirq.measure(*qubits, key='result'))


        return circuit


    p = 1  
    gamma = np.pi / 4  
    circuit = create_qaoa_circuit(G, p, gamma)


    simulator = cirq.Simulator()
    result = simulator.run(circuit)


    measurements = result.measurements['result']
    cut_set = []
    for qubit in range(len(G.nodes())):
        if measurements[0][qubit] == 1: 
            cut_set.append(list(G.nodes())[qubit])


    max_cut_edges = [(u, v) for u, v in G.edges() if (u in cut_set) != (v in cut_set)]


    cost_function_value = sum(G[u][v]['weight'] for u, v in max_cut_edges)


    plt.figure(figsize=(10, 6))
    colors = ['green' if node in cut_set else 'orange' for node in G.nodes()] 


    nx.draw(G, pos=nx.get_node_attributes(G, 'pos'), with_labels=True, node_color=colors)
    nx.draw_networkx_edges(G, pos=nx.get_node_attributes(G, 'pos'), edgelist=max_cut_edges,
                            edge_color='blue', width=2)  


    plt.title("Max-Cut Highlighted Edges")

    img_io = BytesIO()
    plt.savefig(img_io, format='png')  
    img_io.seek(0)  

    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')


    try:
        if from_city in cut_set and to_city in cut_set:
            direct_path = nx.shortest_path(G.subgraph(cut_set), source=from_city, target=to_city)
            print(f"The direct path through Max-Cut from {from_city} to {to_city} is: {direct_path}")
    
        else:
            print(f"Direct path not found. Searching for paths through intermediate cities.")
        
            partition_nodes = [node for node in G.nodes() if node in cut_set]
        
            possible_paths = []
        
            # Check paths using up to three intermediate nodes.
            for intermediate1 in partition_nodes:
                if nx.has_path(G, from_city, intermediate1):
                    path1 = nx.shortest_path(G, source=from_city, target=intermediate1)


                    for intermediate2 in partition_nodes:
                        if intermediate2 != intermediate1 and nx.has_path(G, intermediate1, intermediate2):
                            path2 = nx.shortest_path(G, source=intermediate1, target=intermediate2)


                            for intermediate3 in partition_nodes:
                                if intermediate3 != intermediate1 and intermediate3 != intermediate2 and nx.has_path(G,
                                                                                                                    intermediate2,
                                                                                                                    intermediate3):
                                    path3 = nx.shortest_path(G,
                                                            source=intermediate2,
                                                            target=intermediate3)
                                    complete_path = path1 + path2[1:] + path3[1:]  # Avoid duplicating intermediates.
                                    complete_path.append(to_city)  # Ensure destination is at the end.
                                    possible_paths.append(complete_path)


                    # Include single-intermediate paths that end with destination.
                    possible_paths.append(path1 + [to_city])  


            if possible_paths:
                optimal_path = min(possible_paths, key=len)
                print(f"The optimal path through Max-Cut is: {optimal_path}")
                intermediates_used = optimal_path[1:-1]  # Exclude start and end cities.
                print(f"Intermediary cities used: {intermediates_used}")
            else:
                print(f"No valid paths found through Max-Cut.")
    
    except nx.NetworkXNoPath:
        print(f"No path exists between {from_city} and {to_city}.")


    print(f"Cost function value of the Max-Cut: {cost_function_value}")

    return jsonify({
        "optimal_path": optimal_path,
        "intermediates_used": intermediates_used,
        "cost_function_value": cost_function_value,
        "image": img_base64
    })



@app.route("/generate-circuit", methods=["POST"])
def generate_circuit():
    qasm_code = request.json.get('qasm_code')

    if not qasm_code:
        return {"error": "No QASM code provided"}, 400

    circuit = QuantumCircuit.from_qasm_str(qasm_code)

    fig = plt.figure(figsize=(8, 4)) 
    circuit.draw(output="mpl", plot_barriers=False) 

    img_io = BytesIO()
    plt.savefig(img_io, format='png')  
    img_io.seek(0)  

    return send_file(img_io, mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True, port=8080)
