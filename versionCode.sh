IOSVersionName=`grep "AP_VERSION" Config.xcconfig`
AndroidVersion=`grep "versionName" build.gradle`

AndroidVersion="$(echo -e "${AndroidVersion}" | sed -e 's/^[[:space:]]*//')"

#printf '{"Android":"%s","IOS":"%s"}\n' "$AndroidVersion" "$IOSVersionName" > testVersions.json

printf '{"Android":"%s"}\n' "$AndroidVersion" > testVersions.json
