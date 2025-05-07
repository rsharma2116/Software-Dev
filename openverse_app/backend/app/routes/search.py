from flask import Blueprint, request, jsonify
import requests
from app.models import SearchHistory
from app import db
from app.utils.token import decode_token

search_bp = Blueprint('search', __name__)

@search_bp.route('/media', methods=['GET'])
def media():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_id = decode_token(token)
    query = request.args.get('q')

    if user_id and query:
        db.session.add(SearchHistory(user_id=user_id, query=query))
        db.session.commit()

    res = requests.get('https://api.openverse.org/v1/images', params={'q': query})
    return jsonify(res.json())

@search_bp.route('/history', methods=['GET'])
def history():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_id = decode_token(token)
    if not user_id:
        return jsonify([])

    searches = SearchHistory.query.filter_by(user_id=user_id).order_by(SearchHistory.timestamp.desc()).limit(10)
    return jsonify([{'query': s.query, 'timestamp': s.timestamp.isoformat()} for s in searches])
