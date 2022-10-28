import css from "./File.module.css"

const path = `M14 11C12 11 12 11 12 13V26C12 28 12 28 14 28H25C27 28 27 28 27
26V13C27 11 27 11 25 11ZM16 14h8c.361.225.352.694 0 1h-9c-.323-.254-.348-.749
0-1zM16 16h8c.361.225.352.694 0 1h-9c-.323-.254-.348-.749 0-1zM16
18h8c.361.225.352.694 0 1h-9c-.323-.254-.348-.749 0-1z`;


function FileIcon() {
  return (
    <svg class={css.Svg}>
      <path class={css.Path} d={path} />
    </svg>
  )
}


export default function File(props) {
  let { path, name } = props

  return (
    <>
    <div
      class={css.File}
      path={path}
      name={name}
    >
      <FileIcon />
      {name}
    </div>
    </>
  )
}
