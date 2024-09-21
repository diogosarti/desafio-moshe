import logo from "../assets/logo-moshe.png";

const HeaderComponent = () => {
  return (
    <section className="bg-zinc-900">
      <div className="w-full h-full flex justify-center items-center">
        <img className="py-5" src={logo} alt="" />
      </div>
    </section>
  );
};

export { HeaderComponent };
