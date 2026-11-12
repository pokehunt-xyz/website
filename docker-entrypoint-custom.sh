
#!/bin/sh
set -eu

if [ -z "${TRUSTED_IPS:-}" ]; then
    echo "No TRUSTED_IPS provided, skipping real IP configuration."
    export REAL_IP_CONFIG=""
else
    echo "Configuring trusted TRUSTED_IPS..."

    REAL_IP_CONFIG=""

    # Split comma-separated IPs and CIDRs.
    OLD_IFS="$IFS"
    IFS=','
    set -- $TRUSTED_IPS
    IFS="$OLD_IFS"

    for ip in "$@"; do
        # Remove surrounding whitespace.
        ip=$(echo "$ip" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')
        [ -z "$ip" ] && continue
        REAL_IP_CONFIG="${REAL_IP_CONFIG}set_real_ip_from ${ip};
"
    done

    REAL_IP_CONFIG="${REAL_IP_CONFIG}real_ip_header CF-Connecting-IP;
real_ip_recursive on;"

    export REAL_IP_CONFIG
fi

exec /docker-entrypoint.sh "$@"
