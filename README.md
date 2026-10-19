# 桜理祭 LIVE 2026 公式Webサイト

文化祭・軽音楽部ライブイベント「桜理祭 LIVE 2026」の公式Webサイトです。
最新のモダンフロントエンド技術（HTML5 / CSS3 / Vanilla JavaScript）を用い、サイバー・デジタルかつ本格的な音楽フェスのような高品位ビジュアルとアニメーションを実装しています。

---

## サイトの概要

- **イベント名**: 桜理祭 LIVE 2026
- **主催**: 軽音楽部
- **開催日**: 2026年10月31日（土）
- **時間**: 13:00 〜 14:30
- **会場**: 日本大学理工学部 船橋校舎 スポーツホール(メインステージ)
- **カラーパレット**:
  - 背景の白: `#F4FAFF`
  - メインブルー: `#147FC1`
  - ディープネイビー: `#102E50`
  - アクセントシアン: `#39D5FF`
  - 補助淡ブルー: `#DDF3FF`

---

## ファイル構成

```
BUNKASAI/
├── index.html          # 1ページ完結型メインHTML
├── css/
│   └── style.css       # サイバーデザイン・レスポンシブ・アニメーションスタイル
├── js/
│   └── main.js         # スクロールスパイ・ドロワー・キャンバス音波アニメーション
├── assets/
│   ├── favicon.svg     # 公式ブランドファビコン
│   └── images/         # 今後追加するバンドロゴ・写真用ディレクトリ
└── README.md           # 本仕様・更新マニュアル
```

---

## バンドロゴ・紹介文の追加方法

現在、素材がない状態でも抽象的なサイバー幾何学アートとプレースホルダーHUDにより完成されたデザインとなっています。素材が準備でき次第、以下の手順で簡単に差し替え・追加が可能です。

### 1. ロゴ画像の追加手順

1. ロゴ画像（PNGまたはSVG推奨、背景透明）を `assets/images/` フォルダに保存します。
   - 例: `assets/images/zakuzaku-logo.png`
   - 例: `assets/images/unitown-logo.png`

2. `index.html` の該当バンドのロゴエリア（`id="zakuzaku-logo-slot"` または `id="unitown-logo-slot"`）を開きます。

3. 以下のように `<img>` タグを指定します：
   ```html
   <!-- ZAKUZAKU の場合 -->
   <div class="logo-slot-container" id="zakuzaku-logo-slot">
     <img src="assets/images/zakuzaku-logo.png" alt="ZAKUZAKU ロゴ" class="artist-logo-img">
   </div>
   ```
   ※ `.artist-logo-img` クラスにより、アスペクト比を保ったまま自動で最適なサイズにフィットします。

### 2. 紹介文（プロフィール）の追加手順

1. `index.html` 内の `id="zakuzaku-profile-slot"` または `id="unitown-profile-slot"` を開きます。

2. `div.profile-slot-content` 内の `<p>` タグのテキストを差し替え・追記します：
   ```html
   <div class="profile-slot-content">
     <p class="profile-notice-text">
       ここにバンドの結成エピソードや、披露予定の曲、メンバーの意気込みメッセージなどを記載します。
     </p>
   </div>
   ```
   ※ 文章が長くなっても、レイアウトはフレキシブルに追従して崩れません。

---

## 実装機能 & 品質仕様

1. **セクション構成**:
   - `SECTION 01: HERO`（巨大タイポグラフィ、キャッチコピー、一目でわかる日時・会場HUD）
   - `TICKER 01`（横スクロール無限マーキー）
   - `SECTION 02: TIMETABLE`（ディープネイビー背景、シアン光軸、ZAKUZAKU、CHANGEOVER 20分、unitown。※準備時間は完全非掲載）
   - `TICKER 02`（逆方向マーキー）
   - `SECTION 03: ARTISTS`（1バンド1画面級の大迫力カード、01/02特大ナンバリング、King Gnu / UNISON SQUARE GARDEN カバー明記）
   - `SECTION 04: INFORMATION`（3カラム情報カード、サイバーターミナルスペックコンソール）
   - `FOOTER`（軽音楽部表記、スムーストツプスクロールボタン）

2. **固定ナビゲーション**:
   - スクロール位置に連動して現在セクションが光る Scrollspy 実装。
   - スマートフォンでは洗練されたフルスクリーン・サイバードロワーメニューに切り替え。

3. **アンビエント演出 & パフォーマンス**:
   - CanvasによるCPUフレンドリーなアンビエント音波・サイバーメッシュアニメーション。
   - `prefers-reduced-motion` 対応（動きを抑制するOS設定時は自動で静止表示）。
   - 音声・BGM・効果音は完全無音（自動再生なし）。
   - コンソールエラー・404エラー完全ゼロ。
   - PC・スマートフォン（320px〜4K）で横スクロール一切なし。
