import { ExtendedMesh } from "@enable3d/ammo-physics";
import { THREE } from "@enable3d/phaser-extension";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';



// helper functions for softbody physics function

function isEqual( x1, y1, z1, x2, y2, z2 ) {

    const delta = 0.000001;
    return Math.abs( x2 - x1 ) < delta &&
            Math.abs( y2 - y1 ) < delta &&
            Math.abs( z2 - z1 ) < delta;

}

function mapIndices( bufGeometry, indexedBufferGeom ) {

    // Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry

    const vertices = bufGeometry.attributes.position.array;
    const idxVertices = indexedBufferGeom.attributes.position.array;
    const indices = indexedBufferGeom.index.array;

    const numIdxVertices = idxVertices.length / 3;
    const numVertices = vertices.length / 3;

    bufGeometry.ammoVertices = idxVertices;
    bufGeometry.ammoIndices = indices;
    bufGeometry.ammoIndexAssociation = [];

    for ( let i = 0; i < numIdxVertices; i ++ ) {

        const association = [];
        bufGeometry.ammoIndexAssociation.push( association );

        const i3 = i * 3;

        for ( let j = 0; j < numVertices; j ++ ) {

            const j3 = j * 3;
            if ( isEqual( idxVertices[ i3 ], idxVertices[ i3 + 1 ], idxVertices[ i3 + 2 ],
                vertices[ j3 ], vertices[ j3 + 1 ], vertices[ j3 + 2 ] ) ) {

                association.push( j3 );

            }

        }

    }

}

function processGeometry( bufGeometry ) {

    // Ony consider the position values when merging the vertices
    const posOnlyBufGeometry = new THREE.BufferGeometry();
    posOnlyBufGeometry.setAttribute( 'position', bufGeometry.getAttribute( 'position' ) );
    posOnlyBufGeometry.setIndex( bufGeometry.getIndex() );

    // Merge the vertices so the triangle soup is converted to indexed triangles

    const indexedBufferGeom = BufferGeometryUtils.mergeVertices( posOnlyBufGeometry );

    // Create index arrays mapping the indexed vertices to bufGeometry vertices
    mapIndices( bufGeometry, indexedBufferGeom );

}


// ---------------------------------EXPORTED FUNCTIONS-------------------------------------- //

/**
 * Clamps a value between a low and a high number.
 * @param lowerValue: The lower value of the range
 * @param higherValue: The higher value of the range
 * @param currentValue: The value to be clamped
 * @returns {number} The clamped value
 * @example
 * clamp( 0, 10, 5 ); // returns 5
 * clamp( 0, 10, -5 ); // returns 0
 * clamp( 0, 10, 20 ); // returns 10
 */
export function clamp(lowerValue, upperValue, currentValue) {
    return currentValue < lowerValue ? lowerValue : currentValue > upperValue ? upperValue : currentValue;
}


/**
 *Creates a soft body from a mesh.
 * @param bufferGeom: the buffer geometry of the mesh.
 * @param mass: the mass of the soft body.
 * @param pressure: the internal pressure of the soft body.
 * @param context: the Scene3D context it applies to, (always use this).
 * @returns {ExtendedMesh} The soft body volume.
 * @example 
 * let softBodySphere = createSoftVolume( sphereGeometry, 15, 161, this );
*/
export function createSoftVolume( bufferGeom, mass, pressure, context ) {

    processGeometry( bufferGeom );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const volume = new ExtendedMesh( bufferGeom, material )
    volume.castShadow = true;
    volume.receiveShadow = true;
    volume.frustumCulled = false;

    // Volume physic object
    const softBodyHelpers = new Ammo.btSoftBodyHelpers();
    const volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
        context.third.physics.physicsWorld.getWorldInfo(),
        bufferGeom.ammoVertices,
        bufferGeom.ammoIndices,
        bufferGeom.ammoIndices.length / 3,
        true );

    const sbConfig = volumeSoftBody.get_m_cfg();
    sbConfig.set_viterations( 40 );
    sbConfig.set_piterations( 40 );

    // Soft-soft and soft-rigid collisions
    sbConfig.set_collisions( 0x11 );

    // Friction
    sbConfig.set_kDF( 0.1 );
    // Damping
    sbConfig.set_kDP( 0.01 );
    // Pressure
    sbConfig.set_kPR( pressure );
    // Stiffness
    volumeSoftBody.get_m_materials().at( 0 ).set_m_kLST( 0.9 );
    volumeSoftBody.get_m_materials().at( 0 ).set_m_kAST( 0.9 );

    volumeSoftBody.setTotalMass( mass, false );
    Ammo.castObject( volumeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( 0.05 );
    context.third.physics.physicsWorld.addSoftBody( volumeSoftBody, 1, - 1 );
    volume.userData.physicsBody = volumeSoftBody;
    // Disable deactivation
    volumeSoftBody.setActivationState( 4 );

    return volume;
}