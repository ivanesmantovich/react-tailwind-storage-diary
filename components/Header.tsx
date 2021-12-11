type HeaderType = {};

export const Header = ({}: HeaderType) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"title font-semibold text-8xl mx-auto"}>My Diary</div>
      <div className={"title mt-3 font-semibold text-4xl mx-auto"}>
        What's on your mind?
      </div>
    </div>
  );
};

export default Header;
