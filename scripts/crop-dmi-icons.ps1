param(
  [Parameter(Mandatory = $true)]
  [string]$JobsPath
)

Add-Type -AssemblyName System.Drawing

$jobs = Get-Content -Raw -LiteralPath $JobsPath | ConvertFrom-Json
$format = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
$pngFormat = [System.Drawing.Imaging.ImageFormat]::Png
$unit = [System.Drawing.GraphicsUnit]::Pixel

foreach ($job in $jobs) {
  $outDir = Split-Path -Parent $job.out
  if ($outDir) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
  }

  $source = [System.Drawing.Image]::FromFile($job.source)
  try {
    $bitmap = New-Object System.Drawing.Bitmap ([int]$job.width), ([int]$job.height), $format
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $dest = New-Object System.Drawing.Rectangle 0, 0, ([int]$job.width), ([int]$job.height)
        $src = New-Object System.Drawing.Rectangle ([int]$job.x), ([int]$job.y), ([int]$job.width), ([int]$job.height)
        $graphics.DrawImage($source, $dest, $src, $unit)
      }
      finally {
        $graphics.Dispose()
      }

      $bitmap.Save($job.out, $pngFormat)
    }
    finally {
      $bitmap.Dispose()
    }
  }
  finally {
    $source.Dispose()
  }
}
