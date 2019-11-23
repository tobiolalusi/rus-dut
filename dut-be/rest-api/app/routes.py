from . import app
from flask import jsonify


@app.route('/app/measurementList1')
def getMeasurementList1():
    list = getTestValues1()
    return jsonify(results=list)


@app.route('/app/measurementList2')
def getMeasurementList2():
    list = getTestValues2()
    return jsonify(results=list)


def getTestValues1():
    list = [
        {'x': 1, 'y': 2},
        {'x': 2, 'y': 3},
        {'x': 3, 'y': 5},
        {'x': 4, 'y': 6},
        {'x': 5, 'y': 7},
        {'x': 6, 'y': 8},
        {'x': 7, 'y': 9},
        {'x': 8, 'y': 10},
        {'x': 9, 'y9': 13},
        {'x': 10, 'y': 14},
        {'x': 11, 'y': 16},
        {'x': 12, 'y': 17},
        {'x': 13, 'y': 18},
        {'x': 14, 'y': 20},
        {'x': 15, 'y': 21},
        {'x': 16, 'y': 21},
        {'x': 17, 'y': 22},
        {'x': 18, 'y': 23},
        {'x': 19, 'y': 25},
        {'x': 20, 'y': 30},
    ]
    return list


def getTestValues2():
    list = [
        {'x': 1, 'y': 2},
        {'x': 2, 'y': 3},
        {'x': 3, 'y': 5},
        {'x': 4, 'y': 6},
        {'x': 5, 'y': 7},
        {'x': 6, 'y': 8},
        {'x': 7, 'y': 9},
        {'x': 8, 'y': 10},
        {'x': 9, 'y9': 13},
        {'x': 10, 'y': 14},
        {'x': 11, 'y': 16},
        {'x': 12, 'y': 17},
        {'x': 13, 'y': 18},
        {'x': 14, 'y': 20},
        {'x': 15, 'y': 21},
        {'x': 16, 'y': 21}
    ]
    return list
