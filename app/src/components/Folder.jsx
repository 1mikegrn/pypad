import { createSignal, Show, For, Switch, Match } from "solid-js"

import File from "./File"

import css from "./Folder.module.css"

const path = ` M13 12C10 12 10 12 10 15V24C10 27 10 27 13 27H27C29 27 29 27 29
24V17C29 14 29 14 27 14H22C17 14 20 12 15 12Z `;

function FolderIcon() {
  return (
    <svg class={css.Svg}>
      <path class={css.Path} d={path} />
    </svg>
  )
}

export default function Folder(props) {
  const [expanded, setExpanded] = createSignal(props.expanded)

  function toggleExpand() {
    setExpanded(v => !v)
  }
  const { name, path, files } = props

  return (
    <>
      <div class={css.Folder} onClick={toggleExpand} path={path}>
        <FolderIcon />
        {name}
      </div>
      <Show
        when={expanded()}
      >
        <ul class={css.FolderList}>
          <For each={files}>
            {
              (item, _) => {
                return (
                  <li class={css.FolderItem}>
                    <Switch>
                      <Match when={item.files}>
                        <Folder {...item} expanded={false}/>
                      </Match>
                      <Match when={!item.files}>
                        <File {...item} />
                      </Match>
                    </Switch>
                  </li>
                )
              }
            }
          </For>
        </ul>
      </Show>
    </>
  )
}
