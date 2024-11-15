from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit
from io import BytesIO
import cirq
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/generate-circuit": {"origins": "http://localhost:3000"}})

@app.route("/generate-circuit", methods=["POST"])


def create_tsp_circuit(df):
    
    num_cities = int(df['Number_of_Cities'][0])
    routes = [df[f'Route{i}'][0].split(" -> ") for i in range(1, 4)]
    
    
    all_cities = set(city for route in routes for city in route)  
    num_cities = len(all_cities)  
    city_to_index = {city: i for i, city in enumerate(all_cities)}
    
    
    qubits = [cirq.LineQubit(i) for i in range(num_cities)]
    circuit = cirq.Circuit()
    gates_used = 0

    
    for qubit in qubits:
        circuit.append(cirq.H(qubit))
        gates_used += 1 

   
    def add_connections(route, circuit):
        connections = 0
        for i in range(len(route) - 1):
           
            start = city_to_index[route[i]]  
            end = city_to_index[route[i + 1]]  
            circuit.append(cirq.CNOT(qubits[start], qubits[end]))  # Adding controlled-NOT as a connection
            nonlocal gates_used
            gates_used += 1
            connections += 1
        return connections

  
    connections_per_route = {}
    for idx, route in enumerate(routes):
        connections_per_route[f"Route{idx+1}"] = add_connections(route, circuit)

    return circuit, num_cities, gates_used, connections_per_route


circuit, num_qubits, total_gates, connections_per_route = create_tsp_circuit(df)


print(f"Number of Qubits (Cities): {num_qubits}")
print(f"Total Gates Used: {total_gates}")
print("Connections per Route:", connections_per_route)
print(circuit)

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
