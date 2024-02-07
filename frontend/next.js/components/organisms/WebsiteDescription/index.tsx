import styles from './styles.module.scss';
import { Heading } from '../../atoms/Heading';
import { Paper } from '@/components/atoms/Paper';
import { BasicTable } from '@/components/molecules/BasicTable';
import React from 'react';

export const WebsiteDescription: React.FC = () => {
  return (
    <Paper>
      <section className={styles.overallDescription}>
        <Heading level={3} fontWeight={500}>
          サイトの構成
        </Heading>
        <p>
          ホテルの予約サイトを模した作りになっています。ログイン・会員登録・ホテルの宿泊予約のそれぞれの入力フォームを用意しています。レスポンシブデザインに対応しているためモバイルブラウザでも表示できます。
        </p>
      </section>
      <section className={styles.caution}>
        <Heading level={4} fontWeight={500}>
          ご利用上の注意
        </Heading>
        <ul>
          <li>2020年7月時点でのGoogle Chromeの最新版で動作確認をしています。</li>
          <li>サイトはGitHub Pagesでホストされています。</li>
          <li>
            入力データについて
            <ul>
              <li>データはブラウザのCookieおよびSession Storage、Local Storageに保存されます。</li>
              <li>DBなどサーバ側での保存はありません。</li>
              <li>
                HTMLの仕様上、フォームへの入力内容はURLの末尾に付加されて送信されます。Githubサーバのログなどに残る可能性があるのでお気をつけください。
              </li>
            </ul>
          </li>
          <li>負荷テストには利用しないでください。</li>
          <li>このサイトを利用することによって生じた損害などにつきましては、一切の責任を負いません。</li>
        </ul>
      </section>
      <section className={styles.constituteSection}>
        <Heading level={4} fontWeight={500}>
          構成の詳細
        </Heading>
        <div className={styles.constituteDetails}>
          {[
            {
              heading: 'ログイン画面',
              description:
                'シンプルなテキストインプットとボタンの画面です。ログイン情報はCookieに保存されます。会員登録画面で保存したユーザの他、登録済みのユーザ（下記）があります。',
            },
            {
              heading: '会員登録画面',
              description:
                '複数種類のインプットがある画面です。この画面で登録したユーザはLocal Storageに保存され、ログインに使用することができるようになります。',
            },
            {
              heading: 'マイページ画面',
              description:
                'ログイン後に表示される画面です。登録したユーザ情報が表示され、確認に使うことができます。また、新規登録したユーザの場合アイコン画像の設定と退会（情報削除）ができます。',
            },
          ].map(({ heading, description }, index) => {
            return (
              <div key={index}>
                <Heading level={5} fontWeight={500}>
                  {heading}
                </Heading>
                <p>{description}</p>
              </div>
            );
          })}
        </div>

        <hr />
        <div className={styles.constituteDetails}>
          {[
            {
              heading: '宿泊プラン一覧画面',
              description:
                '「宿泊予約」のメニューから表示できる画面です。表示されるプランは「未ログイン」「一般会員」「プレミアム会員」によって変わります。プラン情報はAjaxで非同期に読み込まれます（トップの一つを除く）。',
            },
            {
              heading: '宿泊予約画面',
              description:
                '宿泊の予約を行う画面です。新規ウィンドウで開きます。複数種類のインプットのほか、合計金額が入力内容で動的に計算され表示されます。基本料および宿泊数・人数の許容値は選択したプランで変わります。',
            },
            {
              heading: '宿泊予約確認画面',
              description:
                '宿泊予約の確定後に表示される画面です。予約で入力した内容の確認表示があります。また、アニメーション付きのダイアログが表示されます。',
            },
          ].map(({ heading, description }, index) => {
            return (
              <div key={index}>
                <Heading level={5} fontWeight={500}>
                  {heading}
                </Heading>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
        <a href="https://hotel.testplanisphere.dev/ja/about.html" className={styles.moreDetail}>
          より詳しい解説はこちら（研修を作る方向け）
        </a>
      </section>
      <section className={styles.userListSection}>
        <BasicTable
          heads={['#', 'メールアドレス', 'パスワード', '会員ランク']}
          rows={registeredUsers.map((user, index) => {
            return (
              <React.Fragment key={index}>
                <th>{index + 1}</th>
                <td>
                  <code>{user.email}</code>
                </td>

                <td>
                  <code>{user.password}</code>
                </td>
                <td>{user.rank}</td>
              </React.Fragment>
            );
          })}
        />
      </section>
    </Paper>
  );
};

const registeredUsers = [
  {
    email: 'ichiro@example.com',
    password: 'password',
    rank: 'プレミアム会員',
  },
  {
    email: 'sakura@example.com',
    password: 'pass1234',
    rank: '一般会員',
  },
  {
    email: 'jun@example.com',
    password: 'pa55w0rd!',
    rank: 'プレミアム会員',
  },
  {
    email: 'yoshiki@example.com',
    password: 'pass-pass',
    rank: '一般会員',
  },
] as const;
