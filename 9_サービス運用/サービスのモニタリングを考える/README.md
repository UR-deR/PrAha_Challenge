# サービスのモニタリングを考える
## 課題1

### フロントエンド
[Sentry](https://docs.sentry.io/)

- エラーのモニタリング
- エラーのグループ分け
- エラーのトリアージや効率的な管理
- ユーザーが直面したエラーのリプレイを確認し、エラーと関係のあるコード行を検知

### バックエンド

[Cloudwatchメトリクス](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/available-metrics.html)の各種閾値と、閾値到達時のアクションを設定する。

1. Cloudwatchのアラームを作成
    - HealthyHostCount < 2
1. SNSトピックを作成し、SlackのWebhook URLを設定
1. CloudWatchアラームのアクションとして、上記SNSトピックを指定し、アラームが発生した際にSNS経由でSlackに通知。

### APIの遅いレスポンス

1. Cloudwatchのアラームを作成
    - TargetResponseTime > 5秒
    - 期間中のリクエストの1割が該当する場合（例：パーセンタイル90が5秒を超える）
1. SNSトピックを作成し、SlackのWebhook URLを設定
1. CloudWatchアラームのアクションとして、上記SNSトピックを指定し、アラームが発生した際にSNS経由でSlackに通知。

## データベースのスロークエリ

1. RDSのスロークエリーログを有効化する。(CloudWatch Logsに出力されるので可視化される)
1. CloudWatch Logsでスロークエリログに基づくメトリクスフィルタを作成。(フィルタ例:  `Query_time: 5`)
1. 作成したメトリクスフィルタを元に、CloudWatchアラームを設定。
1. Amazon SNSで通知用トピックを作成（トピックにSlackのWebhook URLを設定）

## その他
- [ApproximateNumberOfMessagesVisible](https://docs.aws.amazon.com/ja_jp/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-available-cloudwatch-metrics.html#:~:text=ApproximateNumberOfMessagesVisible)を用いて、DLQにメッセーが入ったことを検知する
- [DatabaseMemoryUsagePercentage](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/dg/CacheMetrics.Redis.html#:~:text=DatabaseMemoryUsagePercentage)を用いて、ElastiCacheのメモリの使用率が閾値に達した時に通知を受ける
- [ExecutionFailed](https://aws.amazon.com/jp/blogs/news/introducing-logging-support-for-amazon-eventbridge-pipes/)などのメトリクスを用い、EventBridge pipesのエラーを検知する。
