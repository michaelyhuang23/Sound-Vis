"use strict";

// This bit of code defines a lookup table (LUT) for our colors. 
// Right now we are only providing one color in this "string" value below (Red).
// This will be useful later on when we want a variety of colors to work with
// We will just add colors to this string and send them to the shader
let string = [[0.5,0,0]]; // [R, G, B]
var lut = [];
for (let n=0;n<1;n++) { //Fill out LUT with the color information
    lut.push(new THREE.Vector3((string[n][0]*255-49)/206., (string[n][1]*255-19)/236., (string[n][2]*255-50)/190.));
} 
//Grab the shaders from the document
var vShader = document.getElementById('vertexshader');
var fShader = document.getElementById('fragmentshader');
// Define the uniforms. V3V gives us a 3vector for RGB color in out LUT
var uniforms = {
    vLut: {type: "v3v", value: lut}
}
// Bind the shaders and uniforms to the material
let material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader:   vShader.text,
    fragmentShader: fShader.text
} );

// generate vertices for a simple grid geometry
	for (let i = 0; i <= xsegments; i ++ ) {
		let x = ( i * xsegmentSize ) - xhalfSize; //midpoint of mesh is 0,0
		for ( let j = 0; j <= ysegments; j ++ ) {
			let y = (j * ysegmentSize) - yhalfSize;
			vertices.push( x, y, 0);
			heights.push(Math.random()*255); // no longer flat
		}
	}
// convert heights to a Uint8array
heights = new Uint8Array(heights);

// This bit of code is what passes information from the "Heights" array
// on the cpu into the vertex shader attribute "displacement"
geometry.setAttribute('displacement', new THREE.Uint8BufferAttribute(heights,1));

mesh.geometry.computeFaceNormals();
mesh.geometry.computeVertexNormals();