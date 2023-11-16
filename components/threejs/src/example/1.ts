import * as THREE from 'three'

export function example1(canvas: HTMLCanvasElement) {
  // 创建3D场景对象Scene
  const scene = new THREE.Scene()

  // 创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100)

  // 创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color: 0xFF0000, // 0xff0000设置材质颜色为红色
  })

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh

  mesh.position.set(0, 10, 0)

  scene.add(mesh)

  const camera = new THREE.PerspectiveCamera(30)

  camera.position.set(200, 200, 200)

  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
