import React, { useState, useEffect } from 'react';

import { Image, ImagePropTypes, View, ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const ScalableImage = props => {
	const { source, style } = props;
	let { width, height } = props;

	const [WH, setWH] = useState(null);

	useEffect(() => {
		if (typeof source === 'object') {
			Image.getSize(
				source.uri,
				(ow, oh) => {
					setWH(
						width ?
							{ width, height: width * (oh / ow) } :
							{ width: height * (ow / oh), height }
					);
				}
			);
		}
		else {
			const T = Image.resolveAssetSource(source);
			setWH(
				width ?
					{ width, height: width * (T.height / T.width) } :
					{ width: height * (T.width / T.height), height }
			);
		}
	}, [width, height, source]);

	return WH ?
		<View
			{...props}
			width={undefined}
			height={undefined}
			source={undefined}
		>
			<FastImage
				{...props}
				source={source}
				style={[
					WH,
					style,

					//borderRadius
					props.radius !== undefined && { borderRadius: typeof props.radius === 'boolean' ? 999 : props.radius }
				]}
			/>
		</View> :
		<View style={{ width, height }} />;
};

ScalableImage.propTypes = {
	...ImagePropTypes,
	...ViewPropTypes,

	width: PropTypes.number,
	height: PropTypes.number,

	radius: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};
ScalableImage.defaultProps = {
	width: null,
	height: null,
	source: null
};

export { ScalableImage };
