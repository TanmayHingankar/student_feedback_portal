export function certificateEmailHtml({ studentName, eventName, certificateId }) {
  return `
  <!doctype html>
  <html>
    <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background:#f8fafc;">
      <div style="max-width:600px; margin:0 auto; padding:24px;">
        <div style="background:#ffffff; border-radius:16px; padding:24px; box-shadow:0 6px 18px rgba(15,23,42,0.08);">
          <h2 style="margin:0; color:#0f172a;">Participation Certificate</h2>
          <p style="margin:16px 0 0; color:#334155; line-height:1.5;">Dear ${escapeHtml(studentName)},</p>
          <p style="margin:12px 0 0; color:#334155; line-height:1.5;">Thank you for participating in our event <b>${escapeHtml(eventName)}</b>.</p>
          <p style="margin:12px 0 0; color:#334155; line-height:1.5;">Your feedback is valuable.</p>
          <p style="margin:12px 0 0; color:#334155; line-height:1.5;">Please find your participation certificate attached.</p>

          <div style="margin-top:18px; padding:12px 14px; border:1px solid #fde68a; border-radius:12px; background:#fffbeb;">
            <div style="font-size:12px; color:#92400e;">Certificate ID</div>
            <div style="font-size:16px; font-weight:bold; color:#7c2d12;">${escapeHtml(certificateId)}</div>
          </div>

          <p style="margin:18px 0 0; color:#334155; line-height:1.5;">Regards<br/>Event Team</p>
        </div>
        <div style="text-align:center; color:#94a3b8; font-size:12px; margin-top:12px;">Student Feedback Portal</div>
      </div>
    </body>
  </html>
  `
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '<')
    .replaceAll('>', '>')
    .replaceAll('"', '"')
    .replaceAll("'", '&#039;')
}

