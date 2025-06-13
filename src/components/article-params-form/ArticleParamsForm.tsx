import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'

import { ArrowButton } from 'src/ui/arrow-button'
import { Select }      from 'src/ui/select'
import { RadioGroup }  from 'src/ui/radio-group'
import { Separator }   from 'src/ui/separator'
import { Button }      from 'src/ui/button'
import { Text }        from 'src/ui/text'

import type { ArticleStateType } from 'src/constants/articleProps'
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps'

import styles from './ArticleParamsForm.module.scss'
import pageStyles from 'src/styles/index.module.scss'

const PANEL_WIDTH = 616
const ARROW_SIZE  = 48

type Props = {
  isOpen: boolean
  formState: ArticleStateType
  onChange: (s: ArticleStateType) => void
  onApply: () => void
  onReset: () => void
  onToggle: () => void
}

export const ArticleParamsForm: React.FC<Props> = ({
  isOpen,
  formState,
  onChange,
  onApply,
  onReset,
  onToggle,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as HTMLElement
      if (
        isOpen &&
        t.closest(`.${pageStyles.main}`) &&
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !t.closest(`.${styles.arrowWrapper}`)
      ) {
        onToggle()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const arrowLeft = isOpen
    ? PANEL_WIDTH - ARROW_SIZE / 2
    : -ARROW_SIZE / 2

  return (
    <>
      <div
        className={styles.arrowWrapper}
        style={{ left: `${arrowLeft}px` }}
      >
        <ArrowButton isOpen={isOpen} onClick={onToggle} />
      </div>

      <aside
        ref={panelRef}
        className={clsx(styles.container, isOpen && styles.open)}
      >
        <div className={styles.header}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
        </div>

        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault()
            onApply()
          }}
        >
          <div className={styles.field}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={opt =>
                onChange({ ...formState, fontFamilyOption: opt })
              }
            />
          </div>

          <div className={styles.field}>
            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={opt =>
                onChange({ ...formState, fontSizeOption: opt })
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={opt =>
                onChange({ ...formState, fontColor: opt })
              }
            />
          </div>

          <div className={styles.divider}>
            <Separator />
          </div>

          <div className={styles.field}>
            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={opt =>
                onChange({ ...formState, backgroundColor: opt })
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={opt =>
                onChange({ ...formState, contentWidth: opt })
              }
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              type="clear"
              onClick={() => {
                onReset()
              }}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>
        </form>
      </aside>
    </>
  )
}
