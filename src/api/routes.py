"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
app = Flask(__name__)

# Configura la extensión Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = "super-secret"  # ¡Cambia las palabras "super-secret" por otra cosa!
jwt = JWTManager(app)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def registro():
    email = request.json.get("email")
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    password = request.json.get("password")


    if not email: 
        return jsonify({"error":"email es requerido"}), 400
    if not firstname: 
        return jsonify({"error":"firstname es requerido"}), 400
    if not lastname: 
        return jsonify({"error":"lastname es requerido"}), 400
    if not password: 
        return jsonify({"error":"password es requerido"}), 400
    
    
    encontrado = User.query.filter_by(email=email).first()
    if encontrado: 
        return jsonify({"error":"email ya esta registrado"}), 400
    

    user = User()
    user.email = email
    user.firstname = firstname
    user.lastname = lastname
    user.password = generate_password_hash(password)


    db.session.add(user)
    db.session.commit()
    return jsonify({"mensaje":"registro exitoso, inicie sesion por favor."}), 200

@api.route("/login", methods=["POST"])
def login():
    
    datos = request.json
    email = datos.get('email')
    password = datos.get('password')

    if not email:
        return jsonify({"status": "fail", "mesage": "Email is required"}), 422
    
    if not password: 
        return jsonify({"status": "fail", "mesage": "Password is required"}), 422
    
    found = User.query.filter_by(email=email).first()
    
    if not found:
        return jsonify({"status": "fail", "message": "Usuario No Registrado"}), 404
    
    if not check_password_hash(found.password, password):
        return jsonify({"status": "fail", "message": "CREDENCIALES INCORRECTAS"}), 401

    access_token = create_access_token(identity=found.id, additional_claims={
        "firstname": found.firstname,
        "lastname": found.lastname,
        "email": found.email,
    })

    return jsonify({ "status": "success", "message": "login sucessfully", "access_token": access_token, "user": found.serialize()}), 200

@api.route("/private")
@jwt_required()
def private():
    return jsonify({"mensaje":"esta es la ruta protegida"})

