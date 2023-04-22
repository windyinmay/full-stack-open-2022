import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';

import patientService from './services/patients';

import PatientListPage from './PatientListPage';
import SinglePatientPage from './SinglePatientPage';
import { Patient } from './types';

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [singlePatient, setSinglePatient] = useState<Patient | null>(null);

	// const { id } = useParams<{ id: string }>();

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();
	}, []);

	return (
		<div className='App'>
			<Router>
				<Container>
					<Typography variant='h3' style={{ marginBottom: '0.5em' }}>
						Patientor
					</Typography>
					<Button component={Link} to='/' variant='contained' color='primary'>
						Home
					</Button>
					<Divider hidden />
					<Routes>
						<Route
							path='/'
							element={
								<PatientListPage
									patients={patients}
									setPatients={setPatients}
								/>
							}
						/>
						<Route
							path='/patients/:id'
							element={
								<SinglePatientPage
									singlePatient={singlePatient}
									setSinglePatient={setSinglePatient}
								/>
							}
						/>
					</Routes>
				</Container>
			</Router>
		</div>
	);
};

export default App;

// export const Layout = () => {
// 	return (
// 		<>
// 			<nav>
// 				<ul>
// 					<li>
// 						<Link to='/'>Home</Link>
// 					</li>
// 					<li>
// 						<Link to='/patients'>Patient List</Link>
// 					</li>
// 				</ul>
// 			</nav>

// 			<Outlet />
// 		</>
// 	);
// };
