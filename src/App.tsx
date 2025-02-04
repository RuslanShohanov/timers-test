import React from 'react';
import { TimersGrid } from './TimersGrid';

import styled from 'styled-components';

const AppContainer = styled.div`
	padding: 0.5rem;
`;

export const App = () => (
	<AppContainer>
		<TimersGrid />
	</AppContainer>
);
