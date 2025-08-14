import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import styles from "./registrosAsistencia.module.css";
import { Grades, Section } from "@/features/types/types";

interface HeaderSectionProps {
  startDate: dayjs.Dayjs;
  setStartDate: (date: dayjs.Dayjs) => void;
  minDate: dayjs.Dayjs;
  showRecordTable: boolean;
  setShowRecordTable: (show: boolean) => void;
  showReporteDiario: boolean;
  setShowReporteDiario: (show: boolean) => void;
  valuesByFilter: { grade: string; section: string };
  handleChangesValuesSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  grades: Grades[];
  sections: Section[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  startDate,
  setStartDate,
  minDate,
  showRecordTable,
  setShowRecordTable,
  showReporteDiario,
  setShowReporteDiario,
  valuesByFilter,
  handleChangesValuesSelect,
  grades,
  sections,
}) => {
  // Validaciones de seguridad para evitar errores durante prerendering
  const safeGrades = grades || [];
  const safeSections = sections || [];
  const safeValuesByFilter = valuesByFilter || { grade: '', section: '' };
  
  // Verificar si el grado seleccionado tiene secciones
  const selectedGradeIndex = Number(safeValuesByFilter.grade) - 1;
  const hasSections = selectedGradeIndex >= 0 && 
                     selectedGradeIndex < safeGrades.length && 
                     safeGrades[selectedGradeIndex]?.gotSection;

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>
          Registros de Asistencias
        </h1>
        
        {/* Indicador de vista activa */}
        <div className={styles.viewIndicator}>
          {!showReporteDiario && !showRecordTable && (
            <span className={`${styles.viewBadge} ${styles.viewBadgeMain}`}>
              Vista General
            </span>
          )}
          {showReporteDiario && (
            <span className={`${styles.viewBadge} ${styles.viewBadgeDaily}`}>
              Reporte Diario
            </span>
          )}
          {showRecordTable && (
            <span className={`${styles.viewBadge} ${styles.viewBadgeAccumulated}`}>
              Reporte Acumulado
            </span>
          )}
        </div>
        
        <div className={styles.controlsContainer}>
          <div className={styles.buttonsContainer}>
            <button 
              onClick={() => {
                setShowRecordTable(true);
                setShowReporteDiario(false);
              }} 
              className={`${styles.reportButton} ${
                showRecordTable 
                  ? styles.reportButtonActive
                  : styles.reportButtonInactive
              }`}
            >
              Reporte Acumulado
            </button>
            <button 
              onClick={() => {
                setShowReporteDiario(true);
                setShowRecordTable(false);
              }} 
              className={`${styles.reportButton} ${
                showReporteDiario 
                  ? styles.reportButtonActive
                  : styles.reportButtonInactive
              }`}
            >
              Reporte Diario
            </button>
            
            {(showReporteDiario || showRecordTable) && (
              <button 
                onClick={() => {
                  setShowReporteDiario(false);
                  setShowRecordTable(false);
                }} 
                className={`${styles.reportButton} ${styles.reportButtonReturn}`}
              >
                Vista General
              </button>
            )}
          </div>
          
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DesktopDatePicker
              minDate={minDate}
              value={startDate}
              onChange={(newValue: any) => setStartDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        
        <div className={styles.selectorsContainer}>
          <select
            name="grade"
            onChange={handleChangesValuesSelect}
            className={styles.select}
            value={safeValuesByFilter.grade}
          >
            <option value="">
              Seleccionar Grado
            </option>
            {safeGrades?.map((gr, index) => {
              return (
                <option
                  key={index}
                  value={gr.grade}
                >
                  {gr.traditionalGrade}
                </option>
              );
            })}
          </select>
          
          {hasSections ? (
            <select
              name="section"
              onChange={handleChangesValuesSelect}
              className={styles.select}
              value={safeValuesByFilter.section}
            >
              <option value="">
                Seleccionar Sección
              </option>
              {safeSections?.map((gr, index) => {
                return (
                  <option
                    key={index}
                    value={gr.section}
                  >
                    {gr.section}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection; 