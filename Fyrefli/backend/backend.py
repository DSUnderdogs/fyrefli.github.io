from flask import Flask, request, jsonify
from flask_cors import CORS 
import json 

from obfu import paramEncode

app = Flask(__name__)
cors = CORS(app)


@app.route("/backend", methods=["POST"])
def hello_world():
    print("hit")
    output = "please select an input"

    print(f"request body: {request.get_data(as_text=True)}")
    if(request.get_data(as_text=True) == ""):
        return jsonify({"output": output})
    rj = json.loads(request.get_data(as_text=True))
    input = rj["input"]
    cset = ""
    hashtype = ""
    try:
        cset = rj["typeencode"]
    except:
            pass
    try:
        hashtype = rj["typehash"]
    except:
            pass
    if(rj["option"] == 1):
        output = paramEncode(params=input, charset=cset, urlDecodeInput=True)
    elif(rj["option"] == 2):
        output = paramEncode(params=input,)
    output = paramEncode(params=input, hashType=hashtype)
    print(output)
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)