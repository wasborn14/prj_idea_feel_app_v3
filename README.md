# Ifee

## About

暮らしていく上での考え方や知識を整理し、

感情の変化を記録・観察していくことで、

生活をよりよくする行動をしていくためのアプリです。

こちらはそのアプリのフロント側になります。

## Getting Started

ライブラリのインストール

```
yarn install
```

.env.example から.env.local ファイルを作成

```
NEXT_PUBLIC_IDEA_API_URL=http://127.0.0.1:8000/api/
```

起動

```
yarn dev
```

バックエンド側は Laravel で作成しています。下記から git clone して起動してください。

https://github.com/wasborn14/prj_idea_feel_api_v2

## Technology used

フロントエンド：Next.js, TypeScript, styled-components

バックエンド：Laravel, PHP

## Environment

フロントエンド：Vercel

バックエンド：conohaVPS (Ubuntu)
