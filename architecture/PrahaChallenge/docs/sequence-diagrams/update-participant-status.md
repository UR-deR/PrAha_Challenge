## 参加者の在籍ステータス更新

### 休会 or 退会

```mermaid
sequenceDiagram
    participant X as 参加者X
    participant S as PrAhaChallengeシステム
    box Green 所属先チーム
    participant P as 所属先ペア
    participant T as 所属先チーム
    participant Q as 合流可能ペア
    end
    participant A as 管理者

    X->>S: 休会or退会をリクエスト
    S->>P: 参加者Xを除籍
    opt 所属先ペアの人数が1名の場合
    alt 合流可能ペアが存在する場合
        P->>Q: Xと同じペアだった参加者を転籍
    else 合流可能ペアが存在しない場合
        S->>A: チーム内に合流可能なペアが存在しないことを管理者に通知
    end
    end
    S->>T: 参加者Xを除籍
    opt 所属先チームの人数が2名以下の場合
    S->>A: チームが2名以下になってしまったことを通知
    end
    note over Q: 最も所属人数の少ないペア
```

### 復会

```mermaid
sequenceDiagram
    participant X as 参加者X
    participant S as PrAhaChallengeシステム
    box Green 合流先チーム
    participant T as 合流先チーム
    participant P as 合流先ペア
    participant Q as 新規ペア
    end

    X->>S: 復会をリクエスト
    S->>T: 参加者Xを追加
    note over T: 最も所属人数が少ないチーム
    note over P: 最も所属人数が少ないペア
    alt 合流先ペアの人数が3名の場合
    S->>Q: 参加者Xを追加
    P->>Q: 一名を転籍
    else 合流先ペアの人数が2名の場合
    S->>P: 参加者Xを追加
    end

```
