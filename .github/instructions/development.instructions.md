---
applyTo: '**'
---

# 開発ガイドライン（統合版）

詳細なガイドラインは以下のファイルに分割されています：

- `testing.instructions.md` - テストガイドライン
- `react.instructions.md` - React/TypeScript開発
- `project.instructions.md` - プロジェクト概要とアーキテクチャ

## 🎭 Figma MCP使用ガイドライン

### 使用タイミング

- **実装開始前**: デザイン構造とアセットの事前確認
- **アセット取得時**: アイコン・画像のダウンロード

### MCPコマンド例

```typescript
// デザイン構造確認
await mcp_framelink_fig_get_figma_data({
  fileKey: 'figma-file-key',
});

// アセットダウンロード
await mcp_framelink_fig_download_figma_images({
  fileKey: 'figma-file-key',
  localPath: '/Users/project/src/assets',
  nodes: [{ nodeId: '123:456', fileName: 'icon-home.svg' }],
});
```
