import "./button.module.scss";

const Button = (props: any) => {
  return (
    <input disabled={props.disable?true:false} className={props.className} type="submit" value={props.value} />
  );
};

export default Button;
