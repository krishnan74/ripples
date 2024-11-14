from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cirq
import matplotlib.pyplot as plt
from collections import Counter

app = Flask(__name__)

CORS(app, resources={r"/circuitBot": {"origins": "http://localhost:3000"}})

@app.route("/circuitBot", methods=["POST"])
def circuitBot():
    if request.method == "POST":
        data = request.get_json()

        prompt = data["prompt"]


        return jsonify({"prompt": prompt})
        
    
    else:
        return jsonify({
            "message": "GET request not supported for this route"
        })
def create_circuit(gate_type):
    qubit = cirq.GridQubit(0, 0)
    circuit = cirq.Circuit()

    if gate_type == 'H':
        circuit.append(cirq.H(qubit))
    elif gate_type == 'X':
        circuit.append(cirq.X(qubit))
    elif gate_type == 'Y':
        circuit.append(cirq.Y(qubit))
    elif gate_type == 'Z':
        circuit.append(cirq.Z(qubit))
    else:
        print("Invalid gate type. Defaulting to Hadamard gate.")
        circuit.append(cirq.H(qubit))

    circuit.append(cirq.measure(qubit, key='result'))
    return circuit

def visualize_results(results):
    measurements = results.measurements['result'].flatten()
    counts = Counter(measurements)

    print("Measurement Results:", dict(counts))

    # Plot the results
    plt.bar(counts.keys(), counts.values())
    plt.xlabel('Measurement Result')
    plt.ylabel('Count')
    plt.title('Measurement Results Histogram')
    plt.xticks(ticks=[0, 1], labels=['0', '1'])
    plt.show()

def main():
    print("Ripples")

    # Get user input for the gate type
    gate_type = input("Choose a gate to apply (H for Hadamard, X for Pauli-X, Y for Pauli-Y, Z for Pauli-Z): ").strip().upper()

    # Get user input for the number of repetitions
    try:
        repetitions = int(input("Enter the number of repetitions for the simulation: "))
    except ValueError:
        print("Invalid number. Defaulting to 1024 repetitions.")
        repetitions = 1024

    # Create and print the circuit
    circuit = create_circuit(gate_type)
    print("Quantum Circuit:")
    print(circuit)

    # Simulate the circuit
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=repetitions)

    # Visualize the results
    visualize_results(result)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
