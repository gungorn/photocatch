import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';

import { iconSize } from '~configs';

const keysIcon = Object.keys(iconSize);

const Icon = props => {
	const { shadow, m, rotate, rotateX, rotateY, style, is, i, c } = props;

	const S = [
		shadow && {
			textShadowColor: 'rgba(0, 0, 0, 0.5)',
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 5,
		},
		m && { transform: [{ rotateY: '180deg' }] },
		rotate && { transform: [{ rotate: `${rotate}deg` }] },
		rotateX && { transform: [{ rotateX: `${rotateX}deg` }] },
		rotateY && { transform: [{ rotateY: `${rotateY}deg` }] },
		style
	];

	const getSize = () => {
		for (let i = 0; i < keysIcon.length; i++) {
			if (props[keysIcon[i]]) return iconSize[keysIcon[i]];
		}

		return undefined;
	};

	const props_ = { name: i, size: getSize(), color: c, style: S };

	switch (is) {
		case 'MCI': return <MaterialCommunityIcons {...props_} />;
		case 'Ionicons': return <Ionicons {...props_} />;
		case 'Foundation': return <Foundation {...props_} />;
		case 'Fontisto': return <Fontisto {...props_} />;
		case 'FA': return <FontAwesome {...props_} />;
		case 'FA5': return <FontAwesome5 {...props_} />;
		case 'MI': return <MaterialIcons {...props_} />;
		case 'Entypo': return <Entypo {...props_} />;
		case 'AD': return <AntDesign {...props_} />;
		case 'Octicons': return <Octicons {...props_} />;
		case 'Feather': return <Feather {...props_} />;
		case 'EvilIcons': return <EvilIcons {...props_} />;
		case 'SimpleLineIcons': return <SimpleLineIcons {...props_} />;

		default: return null;
	};
};

const tmp = { ...iconSize };
keysIcon.forEach(d => tmp[d] = PropTypes.bool);

Icon.propTypes = {
	...tmp,

	shadow: PropTypes.bool,
	m: PropTypes.bool,
	rotate: PropTypes.number,
	rotateX: PropTypes.number,
	rotateY: PropTypes.number,
	style: ViewPropTypes.style,
	is: PropTypes.string,
	i: PropTypes.string,
	c: PropTypes.string
};
Icon.defaultProps = {
	shadow: false,
	m: false,
	is: 'FA',
	c: 'main'
};

export { Icon };
