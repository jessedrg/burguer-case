"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tornoFresa = void 0;
const tornoFresa = (faces) => {
    console.log(faces);
    let diferentes = [0, 0, 0];
    let first_origin = [0, 0, 0];
    let first_origin_found = false;
    let posible_torno_plus = false;
    let torno_fresa = 0;
    let firs_vector = [0, 0, 0];
    let first_vector_found = false;
    faces.forEach((val) => {
        val.faces.forEach((face) => {
            let surface = face.surface;
            let face_area = face.area * 1000;
            let surface_area = +face_area;
            if (surface.type !== 'plane') {
                let origin = surface.origin;
                if (first_origin_found === false) {
                    first_origin[0] = origin[0];
                    first_origin[1] = origin[1];
                    first_origin[2] = origin[2];
                    first_origin_found = true;
                }
                else {
                    if (origin && Array.isArray(origin)) {
                        if (origin[0] !== first_origin[0]) {
                            diferentes[0] = 1;
                        }
                        if (origin[1] !== first_origin[1]) {
                            diferentes[1] = 1;
                        }
                        if (origin[2] !== first_origin[2]) {
                            diferentes[2] = 1;
                        }
                    }
                }
                if (diferentes[0] + diferentes[1] + diferentes[2] > 1) {
                    posible_torno_plus = true;
                    torno_fresa = 1;
                }
            }
            if (first_vector_found === false) {
                if (surface.hasOwnProperty('axis')) {
                    first_vector_found = true;
                    firs_vector = surface.axis;
                }
                if (surface.hasOwnProperty('normal')) {
                    first_vector_found = true;
                    firs_vector = surface.normal;
                }
            }
            else {
                if (surface.hasOwnProperty('axis')) {
                    if (Math.abs(firs_vector[0]).toFixed(5) !==
                        Math.abs(surface.axis[0]).toFixed(5) ||
                        Math.abs(firs_vector[1]).toFixed(5) !==
                            Math.abs(surface.axis[1]).toFixed(5) ||
                        Math.abs(firs_vector[2]).toFixed(5) !==
                            Math.abs(surface.axis[2]).toFixed(5)) {
                        console.log(firs_vector[0]);
                        posible_torno_plus = true;
                        torno_fresa = 1;
                    }
                }
                if (surface.hasOwnProperty('normal')) {
                    if (Math.abs(firs_vector[0]).toFixed(5) !==
                        Math.abs(surface.normal[0]).toFixed(5) ||
                        Math.abs(firs_vector[1]).toFixed(5) !==
                            Math.abs(surface.normal[1]).toFixed(5) ||
                        Math.abs(firs_vector[2]).toFixed(5) !==
                            Math.abs(surface.normal[2]).toFixed(5)) {
                        torno_fresa = 1;
                        return;
                    }
                }
            }
        });
    });
    if (torno_fresa === 1) {
        return { process: 'fresa' };
    }
    else {
        return { process: 'torno' };
    }
};
exports.tornoFresa = tornoFresa;
//# sourceMappingURL=tornofresa.js.map