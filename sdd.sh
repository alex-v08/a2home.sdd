#!/bin/bash
# sdd.sh - Script de Automatización SDD

SPEC_FILE="SPEC.md"
TASK_LINE=$(grep -m 1 "\- \[ \]" "$SPEC_FILE")
TASK=$(echo "$TASK_LINE" | sed "s/- \[ \] //g")

if [ -z "$TASK" ]; then 
  echo "✅ Todo completado en $SPEC_FILE"
  exit 0
fi

echo "🚀 Ejecutando Tarea SDD: $TASK"

# Cargar Contexto de Skills
SKILLS_DIR=".opencode/prompts"
ALL_SKILLS=""
if [ -d "$SKILLS_DIR" ]; then
    for f in "$SKILLS_DIR"/*.md; do
        if [ -f "$f" ]; then
            CONTENT=$(cat "$f")
            ALL_SKILLS="$ALL_SKILLS

--- SKILL: $(basename "$f") ---
$CONTENT"
        fi
    done
fi

# Prompt Final
PROMPT="$ALL_SKILLS

--- TAREA ACTUAL: $TASK ---

Tu misión es completar esta tarea modificando archivos o ejecutando comandos. Si es una tarea de ANÁLISIS, genera el archivo correspondiente."

# Ejecutar con opencode (o herramienta equivalente configurada)
# Asumimos que 'opencode' está en el PATH y configurado con un modelo capaz.
if command -v opencode &> /dev/null; then
    opencode run "$PROMPT" --print-logs
else
    echo "❌ Error: 'opencode' CLI no encontrado. Por favor instálalo o configura el runner."
    exit 1
fi

echo "❓ ¿Tarea '$TASK' completada correctamente? (y/n)"
read CONFIRM
if [ "$CONFIRM" = "y" ]; then 
  sed -i "0,/\[ \]/s/\[ \]/[x]/" "$SPEC_FILE"
  echo "✅ Tarea marcada como completada."
  echo "💡 Recuerda hacer commit: git commit -am 'feat: $TASK'"
else
  echo "⚠️  Tarea no marcada. Revisa los errores."
fi
