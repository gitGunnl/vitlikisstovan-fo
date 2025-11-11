interface PrintHeaderFooterProps {
  title: string;
  subtitle?: string;
}

export function PrintHeaderFooter({ title, subtitle }: PrintHeaderFooterProps) {
  return (
    <>
      {/* Print-only header - hidden on screen, appears on every printed page */}
      <div className="print-header hidden print:block" data-testid="print-header">
        <div className="print-header-content">
          <span className="print-header-title">{title}</span>
          {subtitle && <span className="print-header-subtitle">{subtitle}</span>}
        </div>
      </div>

      {/* Print-only footer - hidden on screen, appears on every printed page */}
      <div className="print-footer hidden print:block" data-testid="print-footer">
        <div className="print-footer-content">
          <span className="print-footer-copyright">© 2024 Vitlíkisstovan</span>
          <span className="print-footer-page">Page <span className="page-number"></span></span>
        </div>
      </div>
    </>
  );
}