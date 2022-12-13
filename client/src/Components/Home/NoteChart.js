function NoteChart({ colorNote, lableCharts, seri, nbIndex }) {
  return (
    <>
      <div className="preview-item border-bottom d-flex justify-content-around">
        <div className="preview-thumbnail">
          <div
            className="preview-icon"
            style={{ backgroundColor: colorNote }}
          ></div>
        </div>
        <div
          className={
            nbIndex === 13
              ? "preview-item-content"
              : "preview-item-content mx-3"
          }
        >
          <div className="flex-grow">
            <h6 className="preview-subject">{lableCharts}</h6>
            <p className="text-muted mb-0">{seri} Nhân Viên</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteChart;
