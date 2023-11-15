import styles from "./TextInput.module.css"

export const TextInput = (props) => {
  const {
    placeholder,
    onInput,
    value,
    id
  } = props

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      id={id}
    />
  )
}
