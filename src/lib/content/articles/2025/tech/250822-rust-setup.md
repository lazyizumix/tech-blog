---
title: Rustのセットアップ
date: 2025-08-22
---

# はじめに

ローカルでRustを実行できる環境整えていくよ。

## Rustのインストール

```zsh
mise use -g rust@latest
```

```text
info: downloading installer
info: profile set to 'default'
info: default host triple is aarch64-apple-darwin
info: skipping toolchain installation
info: syncing channel updates for '1.89.0-aarch64-apple-darwin'
info: latest update on 2025-08-07, rust version 1.89.0 (29483883e 2025-08-04)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
info: downloading component 'rust-std'
info: downloading component 'rustc'
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
info: installing component 'rust-std'
info: installing component 'rustc'
info: installing component 'rustfmt'
info: default toolchain set to '1.89.0-aarch64-apple-darwin'
info: checking for self-update
mise rust@1.89.0 ✓ installed                                                                                                                        mise ~/.config/mise/config.toml tools: rust@1.89.0
```

```zsh
rustc --version
cargo --version
rustup toolchain list
```

```text
rustc 1.89.0 (29483883e 2025-08-04)
cargo 1.89.0 (c24e10642 2025-06-23)
1.89.0-aarch64-apple-darwin (active, default)
```
