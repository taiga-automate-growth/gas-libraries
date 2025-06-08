function myFunction() {
  const phantomjscloud = new PhantomJsCloud('ak-de1bk-a75m1-c7shb-jaqb3-s23yw');
  const content = phantomjscloud.getContent('https://www.lancers.jp/work/detail/5072014');
  console.log(content);
}
