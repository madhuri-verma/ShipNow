import Navbar from "../components/navbar";

const Layout = (props: any) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default Layout;
