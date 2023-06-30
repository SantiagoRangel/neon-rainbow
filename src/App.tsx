import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

function App() {
	return (
		<>
			<div id='canvas-container'>
				<Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
					<Scene />
				</Canvas>
			</div>
		</>
	)
}

export default App
