import styles from './styles.module.scss';
import { Heading } from '../../atoms/Heading';
import { Paper } from '@/components/atoms/Paper';
import React from 'react';
import { Card } from '@/components/molecules/Card';

export const SampleCode: React.FC = () => (
  <Paper>
    <section className={styles.sampleCodeSection}>
      <Heading level={3} fontWeight={500}>
        サンプルコード
      </Heading>
      <p>このサイトをテスト対象とした自動テストスクリプトです。学習の参考としてお使いください。</p>
      <div className={styles.sampleCodeList}>
        {sampleCodes.map(({ header, body }, index) => (
          <Card
            key={index}
            header={header}
            body={
              <div className={styles.sampleCodeItemBody}>
                <Heading level={5}>{body.title}</Heading>
                <dl>
                  <dt>フレームワーク</dt>
                  <dd>
                    <a href={body.framework.href} target="_blank">
                      {body.framework.name}
                    </a>
                  </dd>
                  <dt>プログラミング言語</dt>
                  <dd>{body.programmingLanguage}</dd>
                  <dt>テスティングフレームワーク</dt>
                  <dd>
                    <a href={body.testingFramework.href} target="_blank">
                      {body.testingFramework.name}
                    </a>
                  </dd>
                </dl>
                <a href={body.gitHubLink}>コードを見る</a>
              </div>
            }
          />
        ))}
      </div>
    </section>
  </Paper>
);

const sampleCodes = [
  {
    header: 'Java',
    body: {
      title: 'selenide',
      framework: {
        name: 'Selenide',
        href: 'https://selenide.org/',
      },
      programmingLanguage: 'Java',
      testingFramework: {
        name: 'JUnit5',
        href: 'https://junit.org/junit5/',
      },
      gitHubLink: 'https://github.com/testplanisphere/hotel-example-selenide-ja',
    },
  },
  {
    header: 'JavaScript開発者向け',
    body: {
      title: 'webdriverio',
      framework: {
        name: 'WebDriberIO',
        href: 'https://webdriver.io/',
      },
      programmingLanguage: 'JavaScript',
      testingFramework: {
        name: 'Mocha',
        href: 'https://mochajs.org/',
      },
      gitHubLink: 'https://github.com/testplanisphere/hotel-example-webdriverio-ja',
    },
  },
  {
    header: 'Ruby開発者向け',
    body: {
      title: 'capybara',
      framework: {
        name: 'Capybara',
        href: 'https://teamcapybara.github.io/capybara/',
      },
      programmingLanguage: 'Ruby',
      testingFramework: {
        name: 'Rspec',
        href: 'https://rspec.info/',
      },
      gitHubLink: 'https://github.com/testplanisphere/hotel-example-capybara-ja',
    },
  },
  {
    header: 'Java開発者向け',
    body: {
      title: 'selenuim4-java',
      framework: {
        name: 'Selenium WebDriver',
        href: 'https://www.selenium.dev/',
      },
      programmingLanguage: 'Java',
      testingFramework: {
        name: 'JUnit 5',
        href: 'https://junit.org/junit5/',
      },
      gitHubLink: 'https://github.com/testplanisphere/hotel-example-selenium4-java-ja',
    },
  },
] as const;
