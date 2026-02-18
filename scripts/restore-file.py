import subprocess
import os

os.chdir('/vercel/share/v0-project')
result = subprocess.run(['git', 'checkout', 'main', '--', 'app/planificacion-operaciones/gestion-docente/agenda/[id]/page.tsx'], 
                       capture_output=True, text=True)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Return code:", result.returncode)
print("File restored successfully from git main branch")
