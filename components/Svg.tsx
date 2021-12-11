type svgType = {
	onClickArg?: any;
	runOnClick?: Function;
	pathD: string;
	secondOnClickArg?: any;
	secondRunOnClick?: Function;
	home?: boolean;
};

export const Svg = ({
	runOnClick,
	onClickArg,
	pathD,
	secondRunOnClick,
	secondOnClickArg,
	home = false,
}: svgType) => {
	return (
		<svg
			onClick={() => {
				if (runOnClick) runOnClick(onClickArg);
				if (secondRunOnClick) secondRunOnClick(secondOnClickArg);
			}}
			// className="w-7 h-7 hover:w-11 hover:h-11 inline-block transition-all"
			className={
				home
					? 'w-7 h-7 block mx-auto'
					: 'w-7 h-7 m-3 hover:text-yellow-400 inline-block transition-all duration-150'
			}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d={pathD}
			></path>
		</svg>
	);
};

export default Svg;
