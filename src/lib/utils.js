module.exports = {
  safeText: (msg) => String(msg || '').trim(),
  isAdmin: (jid, metadata) => {
    // placeholder: evaluate if user is admin in group metadata
    return false;
  }
};
