import React, { useState, CSSProperties } from 'react'
import stylesIndex from './styles/index.module.scss'
import { Article } from './components/article/Article'
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'
import { defaultArticleState, type ArticleStateType } from './constants/articleProps'

export const App: React.FC = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isWide = articleState.contentWidth.className === 'width-wide'

  return (
    <main
      className={stylesIndex.main}
      style={
        {
          '--bg-color': articleState.backgroundColor.value,
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isMenuOpen={isMenuOpen}
        initialState={articleState}
        onToggle={() => setIsMenuOpen(open => !open)}
        onApply={newState => {
          setArticleState(newState)
        }}
        onReset={() => {
          setArticleState(defaultArticleState)
        }}
      />

      <Article isWide={isWide} />
    </main>
  )
}
