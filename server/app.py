from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/generate-circuit": {"origins": "http://localhost:3000"}})

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
