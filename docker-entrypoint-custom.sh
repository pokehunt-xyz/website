#!/bin/sh
set -eu

if [ -z "${TRUSTED_IPS:-}" ]; then
    echo "No TRUSTED_IPS provided, skipping real IP configuration."
    export REAL_IP_CONFIG=""
else
    echo "Configuring trusted TRUSTED_IPS..."

    REAL_IP_CONFIG=""
    remaining="$TRUSTED_IPS"

    # Keep looping until there are no more IPs/CIDRs to process
    while [ -n "$remaining" ]; do
        # Extract the next IP/CIDR.
        ip="${remaining%%,*}"

        # Remove the processed IP from the remaining list.
        if [ "$remaining" = "$ip" ]; then
            remaining=""
        else
            remaining="${remaining#*,}"
        fi

        # Remove surrounding whitespace and add config line
        ip=$(echo "$ip" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')
        [ -z "$ip" ] && continue
        REAL_IP_CONFIG="${REAL_IP_CONFIG}set_real_ip_from ${ip};
"
    done


    if [ "${TRUSTED_CLOUDFLARE:-false}" = "true" ]; then
        echo "Using Cloudflare CF-Connecting-IP header..."
        REAL_IP_CONFIG="${REAL_IP_CONFIG}real_ip_header CF-Connecting-IP;
"
    else
        echo "Using X-Forwarded-For header..."
        REAL_IP_CONFIG="${REAL_IP_CONFIG}real_ip_header X-Forwarded-For;
"
    fi

    REAL_IP_CONFIG="${REAL_IP_CONFIG}real_ip_recursive on;"

    export REAL_IP_CONFIG
fi

exec /docker-entrypoint.sh "$@"
