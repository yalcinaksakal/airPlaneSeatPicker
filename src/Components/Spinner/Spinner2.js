import styles from "./Spinner2.module.css";

const Spinner2 = () => (
  <div className={styles.container}>
    <p>Loading</p>
    <div className={styles.spinner}></div>
  </div>
);
export default Spinner2;
