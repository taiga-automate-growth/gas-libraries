function test_() {
  const dbId = "11EloU4gEVapzuiKFPxANeA3As-sg_qIenOvYtkwgUDU";
  const estimateFolderId = "1u-r6RfuQnWpBNpYSsZsh6sq6Kl2lLp7w";
  const exporter = create(dbId)
    exporter.getParameter()
    .orientation("vertical")
    .fitWidth(true)
    .sheet("見積書テンプレート")
    .showGridlines(false)
    const pdf = exporter.exportAndSave("test",estimateFolderId);
    console.log(pdfId);
}
