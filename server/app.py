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


if __name__ == "__main__":
    app.run(debug=True, port=8080)
