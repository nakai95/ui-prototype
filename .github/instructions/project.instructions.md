---
applyTo: '**/*.{ts,tsx,js,jsx}'
---

# プロジェクト概要

## 📋 技術スタック

- React 19 + TypeScript + Vite + Material-UI (MUI)
- アーキテクチャ: Clean Architecture + Domain Driven Design
- 状態管理: TanStack Query (React Query)
- ルーティング: React Router v6 + 型安全なParamsGuard
- テスト: Vitest + React Testing Library
- パッケージマネージャー: pnpm

## 📁 アーキテクチャ

### ディレクトリ構造

- `domain/`: ビジネスロジック・ドメインモデル
- `adapters/`: 外部API・データアクセス
- `app/`: アプリケーション設定・プロバイダー
- `i18n/`: 国際化（翻訳設定・言語ファイル）
- `presentations/`: UI層（コンポーネント・ページ・レイアウト）

### 分離指針

- **Presentational**: UIのみ、propsに依存
- **Container**: データ取得・状態管理
- **適切な責任分離**: 1コンポーネント1責任

## 🔍 開発時の確認コマンド

```bash
# 新しいコンポーネント作成後の確認
pnpm lint          # ESLintチェック
pnpm test:related  # 関連テスト実行

# 完全なチェック（コミット前推奨）
pnpm format:fix    # Prettierによるコードフォーマット（コードを自動整形）
pnpm test:coverage # カバレッジ付きテスト
```

## ✅ チェックリスト

- [ ] コンポーネントに適切な型定義がある
- [ ] テスト記述が人間が読みやすい形式（日本語）
- [ ] MUIコンポーネントを個別インポートしている
- [ ] カスタムフックにuseプレフィックスがついている
- [ ] ファイル構造がアーキテクチャに従っている
