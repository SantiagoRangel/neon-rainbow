import { OrbitControls } from '@react-three/drei'
import Screen from './Screen'
import { Stats } from '@react-three/drei'

export default function Scene() {
	return (
		<>
			<OrbitControls></OrbitControls>
			<Stats></Stats>
			<Screen />
		</>
	)
}
