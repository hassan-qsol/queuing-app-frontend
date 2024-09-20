const Loader = () => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div
				className={
					"animate-spin w-10 h-10 border-4 border-t-transparent rounded-full border-gray-300"
				}
			></div>
		</div>
	);
};

export default Loader;
