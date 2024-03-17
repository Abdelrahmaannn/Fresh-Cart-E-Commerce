import { Bars } from "react-loader-spinner";

function Loading() {
  return (
    <>

    <div className="d-flex justify-content-center  align-items-center vh-100 ">
      <Bars
        height="90"
        width="80"
        color="#000"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </div>
    </>
  );
}

export default Loading;
