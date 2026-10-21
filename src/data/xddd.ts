// 笑死（XDDD）App 的隱私權政策與支援頁內容，App Store 審核需要這兩個網址。
// App 有繁中、英文、日文三種語言，所以這兩頁另外多一個 /ja/ 版本。
// 段落是 HTML 字串（含連結），在頁面上用 set:html 輸出。

export type AppLang = 'zh' | 'en' | 'ja';

export const appLangs: Record<AppLang, { prefix: string; htmlLang: string; label: string }> = {
  zh: { prefix: '', htmlLang: 'zh-Hant', label: '繁體中文' },
  en: { prefix: '/en', htmlLang: 'en', label: 'English' },
  ja: { prefix: '/ja', htmlLang: 'ja', label: '日本語' },
};

/** 由網址判斷語言：/ja/ 開頭是日文、/en/ 開頭是英文，其餘是中文。 */
export function getAppLang(url: URL): AppLang {
  if (url.pathname.startsWith('/ja/')) return 'ja';
  if (url.pathname.startsWith('/en/')) return 'en';
  return 'zh';
}

export type DocSection = {
  heading: string;
  body?: string[];
  list?: string[];
  /** 列表後面的段落 */
  after?: string[];
};

export type Faq = { q: string; a: string[] };

const email = 'ruxiu0409@mail.iosclub.tw';
const mailto = `<a href="mailto:${email}">${email}</a>`;
const eula = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

/** 每種語言共用的小字 */
export const appUi: Record<AppLang, { langNav: string }> = {
  zh: { langNav: '語言' },
  en: { langNav: 'Language' },
  ja: { langNav: '言語' },
};

export const privacy: Record<AppLang, { title: string; lead: string; effective: string; sections: DocSection[] }> = {
  zh: {
    title: '笑死 隱私權政策',
    lead: '笑死不收集你的任何個人資料。你的梗圖只存在你的裝置和你自己的 iCloud 裡。',
    effective: '生效日期：2026 年 10 月 21 日',
    sections: [
      {
        heading: '資料收集',
        body: [
          '笑死沒有帳號，沒有廣告、分析或追蹤，也沒有使用任何第三方 SDK。開發者不會收集、儲存或分享你的任何個人資料。',
        ],
      },
      {
        heading: '你的梗圖存在哪裡',
        body: [
          '你儲存的梗圖、標籤和辨識出的文字都存在你的裝置上，並透過你自己的 iCloud 私人資料庫（CloudKit）在你的裝置之間同步。這些資料在你的 iCloud 帳號裡，開發者無法存取。',
          '透過分享選單從其他 App 存進笑死的圖片也一樣，只存在你的裝置和你的 iCloud 裡。',
        ],
      },
      {
        heading: '文字辨識',
        body: [
          '梗圖裡的文字由 Apple 的 Vision 框架在你的裝置上辨識。圖片不會上傳到任何開發者的伺服器。',
        ],
      },
      {
        heading: '精選梗圖',
        body: [
          '「精選」是開發者整理的梗圖庫，從 Apple 的 CloudKit 公開資料庫下載。這個梗圖庫是唯讀的，使用者無法上傳內容。',
        ],
      },
      {
        heading: '照片權限',
        body: ['笑死只在以下情況使用照片權限：'],
        list: [
          '匯入你挑選的梗圖。',
          'XDD Plus 訂閱者開啟相簿功能後，在「照片」App 建立並維護一本名為「笑死」的相簿。',
        ],
        after: [
          '刪除由笑死存進「照片」的梗圖時，iOS 會先請你確認。你原本從「照片」匯入的照片只會從相簿中移除，絕不會被刪除。',
        ],
      },
      {
        heading: '訂閱與付款',
        body: [
          'XDD Plus 是月訂閱，新訂閱者享有一週免費試用。購買流程完全由 Apple 處理，開發者看不到你的付款資訊。',
        ],
      },
      {
        heading: '刪除你的資料',
        list: [
          '在 App 中刪除梗圖。',
          '要移除 iCloud 裡的資料，前往「設定」→「Apple 帳號」→「iCloud」→「管理儲存空間」→「笑死」。',
          '刪除 App 會一併移除裝置上的資料。',
        ],
      },
      {
        heading: '兒童隱私',
        body: ['笑死並非以 13 歲以下兒童為對象。笑死不收集任何人的資料，包括兒童。'],
      },
      {
        heading: '政策變更',
        body: ['本政策如有更新，會公布在這個頁面，並同時更新生效日期。'],
      },
      {
        heading: '聯絡方式',
        body: [`對本政策有任何問題，請寫信給開發者蔡承曄：${mailto}。`],
      },
    ],
  },
  en: {
    title: 'XDDD Privacy Policy',
    lead: "XDDD doesn't collect any personal data. Your memes stay on your device and in your own iCloud.",
    effective: 'Effective October 21, 2026',
    sections: [
      {
        heading: 'Data Collection',
        body: [
          'XDDD has no accounts, no ads, no analytics, no tracking, and no third-party SDKs. The developer does not collect, store, or share any of your personal data.',
        ],
      },
      {
        heading: 'Where Your Memes Are Stored',
        body: [
          'The memes you save, along with their tags and recognized text, are stored on your device and synced across your devices through your own private iCloud database (CloudKit). This data lives in your iCloud account, and the developer cannot access it.',
          'Images you save from other apps through the share sheet are handled the same way: they stay on your device and in your iCloud.',
        ],
      },
      {
        heading: 'Text Recognition',
        body: [
          "Text in your memes is recognized on your device using Apple's Vision framework. Images are never uploaded to any server run by the developer.",
        ],
      },
      {
        heading: 'The Memes Library',
        body: [
          "The Memes library is curated by the developer and downloaded from Apple's CloudKit public database. It is read-only; users can't upload to it.",
        ],
      },
      {
        heading: 'Photos Access',
        body: ['XDDD uses Photos access only to:'],
        list: [
          'Import the memes you pick.',
          'For XDD Plus subscribers who turn it on, create and maintain an album named “XDDD” in the Photos app.',
        ],
        after: [
          'When you delete a meme that XDDD saved to Photos, iOS asks you to confirm first. Photos you originally imported are only removed from the album and are never deleted.',
        ],
      },
      {
        heading: 'Subscriptions and Payment',
        body: [
          'XDD Plus is a monthly subscription with a one-week free trial for new subscribers. Purchases are handled entirely by Apple, and the developer never sees your payment information.',
        ],
      },
      {
        heading: 'Deleting Your Data',
        list: [
          'Delete memes in the app.',
          'To remove data from iCloud, go to Settings → Apple Account → iCloud → Manage Storage → XDDD.',
          'Deleting the app removes its data from your device.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'XDDD is not directed at children under 13. It does not collect data from anyone, including children.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: ['If this policy changes, the update will be posted on this page with a new effective date.'],
      },
      {
        heading: 'Contact',
        body: [`Questions about this policy? Email the developer, Tsai Cheng-Yeh, at ${mailto}.`],
      },
    ],
  },
  ja: {
    title: 'XDDD プライバシーポリシー',
    lead: 'XDDD は個人データを一切収集しません。ミームはお使いのデバイスと、あなた自身の iCloud にだけ保存されます。',
    effective: '施行日：2026年10月21日',
    sections: [
      {
        heading: '収集するデータ',
        body: [
          'XDDD にはアカウント、広告、分析、トラッキング、サードパーティ SDK は一切ありません。開発者があなたの個人データを収集、保存、共有することはありません。',
        ],
      },
      {
        heading: 'ミームの保存場所',
        body: [
          '保存したミーム、タグ、認識されたテキストはデバイス上に保存され、あなた自身の iCloud プライベートデータベース（CloudKit）を通じてデバイス間で同期されます。このデータはあなたの iCloud アカウント内にあり、開発者はアクセスできません。',
          '共有シートを使って他のアプリから保存した画像も同様に、デバイスとあなたの iCloud にだけ保存されます。',
        ],
      },
      {
        heading: 'テキスト認識',
        body: [
          'ミーム内のテキストは、Apple の Vision フレームワークによってデバイス上で認識されます。画像が開発者のサーバーにアップロードされることはありません。',
        ],
      },
      {
        heading: '厳選ミームライブラリ',
        body: [
          '開発者が厳選したミームライブラリは、Apple の CloudKit 公開データベースからダウンロードされます。閲覧専用のため、ユーザーがアップロードすることはできません。',
        ],
      },
      {
        heading: '写真へのアクセス',
        body: ['XDDD が写真へのアクセスを使用するのは、次の場合だけです。'],
        list: [
          '選んだミームを読み込むとき。',
          'XDD Plus の登録者がアルバム機能をオンにしたとき、「写真」App に「XDDD」というアルバムを作成・管理するため。',
        ],
        after: [
          'XDDD が「写真」に保存したミームを削除するときは、iOS の確認ダイアログが表示されます。もともと「写真」から読み込んだ写真はアルバムから外されるだけで、削除されることはありません。',
        ],
      },
      {
        heading: 'サブスクリプションと支払い',
        body: [
          'XDD Plus は月額サブスクリプションで、新規登録者は1週間無料でお試しいただけます。購入の手続きはすべて Apple が行い、開発者が支払い情報を目にすることはありません。',
        ],
      },
      {
        heading: 'データの削除',
        list: [
          'アプリ内でミームを削除できます。',
          'iCloud のデータを削除するには、「設定」→「Apple アカウント」→「iCloud」→「ストレージを管理」→「XDDD」を開きます。',
          'アプリを削除すると、デバイス上のデータも削除されます。',
        ],
      },
      {
        heading: '子どものプライバシー',
        body: ['XDDD は13歳未満の子どもを対象としていません。子どもを含め、誰のデータも収集しません。'],
      },
      {
        heading: 'ポリシーの変更',
        body: ['本ポリシーを変更する場合は、このページでお知らせし、施行日を更新します。'],
      },
      {
        heading: 'お問い合わせ',
        body: [`本ポリシーに関するご質問は、開発者の蔡承曄（Tsai Cheng-Yeh）までメールでお寄せください：${mailto}`],
      },
    ],
  },
};

export const support: Record<
  AppLang,
  { title: string; lead: string; faqHeading: string; faq: Faq[]; sections: DocSection[] }
> = {
  zh: {
    title: '笑死 支援',
    lead: '笑死幫你收藏梗圖、加上標籤，再用標籤或圖裡的文字把它找出來，分享給朋友。有任何問題或建議，都歡迎來信。',
    faqHeading: '常見問題',
    faq: [
      {
        q: '怎麼從其他 App 存梗圖？',
        a: [
          '在其他 App 點分享按鈕，選擇「笑死」，圖片就會存進笑死。如果分享選單裡沒看到笑死，請滑到 App 列的最右邊，點「更多」把它加進來。',
        ],
      },
      {
        q: '怎麼用圖裡的文字搜尋？',
        a: ['笑死會在裝置上辨識梗圖裡的文字。在搜尋欄輸入圖中出現的字，就能找到那張梗圖；也可以用標籤搜尋。'],
      },
      {
        q: '怎麼在多台裝置間同步？',
        a: [
          '笑死透過你的 iCloud 同步。在每台裝置登入同一個 Apple 帳號並開啟 iCloud，梗圖、標籤和辨識出的文字就會同步到每台裝置。',
        ],
      },
      {
        q: '「照片」相簿功能是什麼？',
        a: [
          'XDD Plus 訂閱者開啟這個功能後，笑死會在「照片」App 建立一本名為「笑死」的相簿，並持續維護它。XDD Plus 是月訂閱，新訂閱者享有一週免費試用。',
          '訂閱到期後，已經在相簿裡的照片會留著，只是不再同步新的梗圖。',
        ],
      },
      {
        q: '怎麼恢復購買？',
        a: ['在笑死的設定中選擇恢復購買。請確認目前登入的是當初訂閱時使用的 Apple 帳號。'],
      },
      {
        q: '怎麼取消訂閱？',
        a: ['訂閱由 Apple 管理。前往「設定」→「Apple 帳號」→「訂閱項目」→「XDD Plus」即可取消。'],
      },
      {
        q: '怎麼更改 App 的語言？',
        a: ['笑死會跟隨系統語言。如果只想讓笑死使用其他語言，請前往「設定」→「App」→「笑死」→「語言」。'],
      },
      {
        q: '怎麼刪除我的資料？',
        a: [
          '在 App 中可以直接刪除梗圖。要移除 iCloud 裡的資料，前往「設定」→「Apple 帳號」→「iCloud」→「管理儲存空間」→「笑死」。刪除 App 會一併移除裝置上的資料。',
          '詳情請見<a href="/xddd/privacy/">隱私權政策</a>。',
        ],
      },
    ],
    sections: [
      {
        heading: '聯絡我們',
        body: [`有問題、建議或想回報錯誤，請寫信到 ${mailto}。`],
      },
      {
        heading: '使用條款',
        body: [
          `笑死適用 Apple 的<a href="${eula}">標準使用者授權合約（EULA）</a>。隱私相關說明請見<a href="/xddd/privacy/">隱私權政策</a>。`,
        ],
      },
    ],
  },
  en: {
    title: 'XDDD Support',
    lead: 'XDDD lets you save memes, tag them, find them again by tag or by the text in the image, and share them with friends. Questions or ideas? Get in touch anytime.',
    faqHeading: 'FAQ',
    faq: [
      {
        q: 'How do I save memes from other apps?',
        a: [
          'In any app, tap the Share button and choose XDDD to save the image. If XDDD isn’t in the share sheet, scroll to the end of the row of apps and tap More to add it.',
        ],
      },
      {
        q: 'How do I search by the text in a meme?',
        a: [
          'XDDD recognizes the text in your memes on your device. Type words that appear in an image into the search field to find it. You can also search by tag.',
        ],
      },
      {
        q: 'How do I sync across my devices?',
        a: [
          'XDDD syncs through your iCloud. Sign in to the same Apple Account with iCloud turned on, and your memes, tags, and recognized text sync to each device.',
        ],
      },
      {
        q: 'What is the Photos album feature?',
        a: [
          'XDD Plus subscribers can turn this on to have XDDD create and maintain an album named “XDDD” in the Photos app. XDD Plus is a monthly subscription with a one-week free trial for new subscribers.',
          'If your subscription ends, the photos already in the album stay there; only syncing new memes stops.',
        ],
      },
      {
        q: 'How do I restore my purchase?',
        a: [
          'Choose Restore Purchases in XDDD’s Settings. Make sure you’re signed in with the Apple Account you subscribed with.',
        ],
      },
      {
        q: 'How do I cancel my subscription?',
        a: [
          'Subscriptions are managed by Apple. Go to Settings → Apple Account → Subscriptions → XDD Plus to cancel.',
        ],
      },
      {
        q: 'How do I change the app’s language?',
        a: [
          'XDDD follows your system language. To use a different language for XDDD only, go to Settings → Apps → XDDD → Language.',
        ],
      },
      {
        q: 'How do I delete my data?',
        a: [
          'Delete memes right in the app. To remove data from iCloud, go to Settings → Apple Account → iCloud → Manage Storage → XDDD. Deleting the app removes its data from your device.',
          'See the <a href="/en/xddd/privacy/">Privacy Policy</a> for details.',
        ],
      },
    ],
    sections: [
      {
        heading: 'Contact',
        body: [`For questions, suggestions, or bug reports, email ${mailto}.`],
      },
      {
        heading: 'Terms of Use',
        body: [
          `XDDD is provided under Apple’s <a href="${eula}">Standard End User License Agreement (EULA)</a>. For privacy, see the <a href="/en/xddd/privacy/">Privacy Policy</a>.`,
        ],
      },
    ],
  },
  ja: {
    title: 'XDDD サポート',
    lead: 'XDDD は、ミームを保存してタグを付け、タグや画像内のテキストで検索し、友だちと共有できるアプリです。ご質問やご要望は、お気軽にメールでお寄せください。',
    faqHeading: 'よくある質問',
    faq: [
      {
        q: '他のアプリからミームを保存するには？',
        a: [
          '他のアプリで共有ボタンをタップし、「XDDD」を選ぶと画像が保存されます。共有シートに XDDD が見当たらない場合は、アプリの列を右端までスクロールし、「その他」から追加してください。',
        ],
      },
      {
        q: '画像内の文字で検索するには？',
        a: [
          'XDDD はミーム内のテキストをデバイス上で認識します。検索欄に画像内の言葉を入力すると、そのミームが見つかります。タグでも検索できます。',
        ],
      },
      {
        q: '複数のデバイスで同期するには？',
        a: [
          'XDDD は iCloud で同期します。各デバイスで同じ Apple アカウントにサインインし、iCloud をオンにすると、ミーム、タグ、認識されたテキストが各デバイスに同期されます。',
        ],
      },
      {
        q: '「写真」アルバム機能とは？',
        a: [
          'XDD Plus の登録者がこの機能をオンにすると、XDDD が「写真」App に「XDDD」というアルバムを作成し、管理します。XDD Plus は月額サブスクリプションで、新規登録者は1週間無料でお試しいただけます。',
          'サブスクリプションが終了しても、アルバム内の写真はそのまま残ります。新しいミームの同期だけが停止します。',
        ],
      },
      {
        q: '購入を復元するには？',
        a: [
          'XDDD の設定から購入を復元できます。サブスクリプションを購入したときと同じ Apple アカウントでサインインしていることを確認してください。',
        ],
      },
      {
        q: 'サブスクリプションを解約するには？',
        a: [
          'サブスクリプションは Apple が管理しています。「設定」→「Apple アカウント」→「サブスクリプション」→「XDD Plus」から解約できます。',
        ],
      },
      {
        q: 'アプリの言語を変更するには？',
        a: [
          'XDDD はシステムの言語に従います。XDDD だけ別の言語にしたい場合は、「設定」→「アプリ」→「XDDD」→「言語」で変更できます。',
        ],
      },
      {
        q: 'データを削除するには？',
        a: [
          'ミームはアプリ内で削除できます。iCloud のデータを削除するには、「設定」→「Apple アカウント」→「iCloud」→「ストレージを管理」→「XDDD」を開きます。アプリを削除すると、デバイス上のデータも削除されます。',
          '詳しくは<a href="/ja/xddd/privacy/">プライバシーポリシー</a>をご覧ください。',
        ],
      },
    ],
    sections: [
      {
        heading: 'お問い合わせ',
        body: [`ご質問、ご要望、不具合のご報告は、${mailto} までメールでお寄せください。`],
      },
      {
        heading: '利用規約',
        body: [
          `XDDD には Apple の<a href="${eula}">標準エンドユーザー使用許諾契約（EULA）</a>が適用されます。プライバシーについては<a href="/ja/xddd/privacy/">プライバシーポリシー</a>をご覧ください。`,
        ],
      },
    ],
  },
};
